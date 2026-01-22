from fastapi import FastAPI, Header, HTTPException
from google.cloud import bigquery
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # O endereço do seu Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = bigquery.Client()

def get_user_filter_clause(email: str) -> str:
    if not email:
        raise HTTPException(status_code=401, detail="E-mail não fornecido")
    
    if "@colaborativaeduc.com.br" in email:
        return "1=1"
    
    return f"""
        projeto_id IN (
            SELECT Sponsors.projeto_id 
            FROM `colabdata-362716.cs_system.projetos_sponsorsprojetos` AS Sponsors
            JOIN `colabdata-362716.cs_system.jornada_pessoa` AS Pessoas ON Pessoas.id = Sponsors.pessoa_id
            JOIN `colabdata-362716.cs_system.auth_user` AS Users ON Users.id = Pessoas.user_id
            WHERE Users.email = '{email}'
        )
    """
# Exemplo de rota para o gráfico de Gauge (IEG)
@app.get("/api/stats/ieg")
async def get_ieg_stats(authorization: str = Header(None)):
    email = authorization.replace("Bearer ", "") if authorization else None
    filtro = get_user_filter_clause(email)
    
    query = f"""
        SELECT AVG(IEG) as media_ieg
        FROM `colabdata-362716.dataform_marts.dim_cursistas`
        WHERE {filtro}
        AND projeto_id = 520
    """
    
    try:
        df = client.query(query).to_dataframe()
        media = float(df['media_ieg'].iloc[0]) if not df.empty else 0
        return {"iegScore": round(media, 1)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/api/acompanhamento")
async def get_acompanhamento(authorization: str = Header(None)):
    email = authorization.replace("Bearer ", "") if authorization else None

    if not email:
        raise HTTPException(status_code=401, detail="Usuário não autorizado")
    
    if "@colaborativaeduc.com.br" in email:
        acompanhamentos_autorizados_query = f"""
            SELECT * 
            FROM `colabdata-362716.dataform_marts.dim_cursistas`
            """
    else:
        acompanhamentos_autorizados_query = f"""
        SELECT * FROM `colabdata-362716.dataform_marts.dim_cursistas` 
        WHERE projeto_id IN (
            SELECT Sponsors.projeto_id 
            FROM `colabdata-362716.cs_system.projetos_sponsorsprojetos` AS Sponsors
            JOIN `colabdata-362716.cs_system.jornada_pessoa` AS Pessoas ON (Pessoas.id = Sponsors.pessoa_id)
            JOIN `colabdata-362716.cs_system.auth_user` AS Users ON (Users.id = Pessoas.user_id)
            WHERE Users.email = '{email}'
        )
        """

    try:
        df = client.query(acompanhamentos_autorizados_query).to_dataframe()
        df = df.astype(object).where(df.notnull(), None)
        return df.to_dict(orient="records")
    except Exception as e:
        print(f"Erro no BigQuery: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/api/stats/risk_status")
async def get_risk_status(authorization: str = Header(None)):
    email = authorization.replace("Bearer ", "") if authorization else None
    filtro = get_user_filter_clause(email)
    
    query = f"""
        SELECT 
            CASE 
                WHEN IEG < 50 THEN "Em risco"
                WHEN IEG >= 50 AND IEG < 90 THEN "Em dia"
                WHEN IEG >= 90 THEN "Destaque"
            END AS status,
            COUNT(*) AS value,
            CASE 
                WHEN IEG < 50 THEN "#ef4444"
                WHEN IEG >= 50 AND IEG < 90 THEN "#fbbf24"
                WHEN IEG >= 90 THEN "#95be43"
            END AS color
        FROM `colabdata-362716.dataform_marts.dim_cursistas`
        WHERE {filtro}
        AND projeto_id = 520

        GROUP BY 1,3
    """
    
    try:
        df = client.query(query).to_dataframe()
        print(df)
        return df.to_dict(orient="records")
    except Exception as e:
        print(f"Erro no BigQuery: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/stats/engagement_funnel")
async def get_engagement_funnel(authorization: str = Header(None)):
    email = authorization.replace("Bearer ", "") if authorization else None
    filtro = get_user_filter_clause(email)
    
    query = f"""
        WITH count_cursistas AS (
        SELECT 
            projeto_id,
            COUNT(*) AS qtd_cursistas
        FROM `cs_system.projetos_cursistas` 
        GROUP BY projeto_id
        )

        SELECT 
        trigger,
        quantidade,
        ROUND((quantidade/qtd_cursistas)*100) AS porcentagem

        FROM `cs_system.projetos_funilengajamento` AS Funil

        LEFT JOIN count_cursistas AS C_Cursistas ON(C_Cursistas.projeto_id = Funil.projeto_id)

        WHERE Funil.projeto_id = 520

        ORDER BY quantidade DESC
    """
    
    try:
        df = client.query(query).to_dataframe()
        print (df)
        return df.to_dict(orient="records")
    except Exception as e:
        print(f"Erro no BigQuery: {e}")
        raise HTTPException(status_code=500, detail=str(e))
