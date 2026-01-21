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