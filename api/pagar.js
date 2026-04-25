export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { nome, cpf, valor, descricao } = req.body;

    const response = await fetch("URL_DA_PARADISE", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: valor,
        description: descricao,
        customer: {
          name: nome,
          document: cpf
        }
      })
    });

    const data = await response.json();

    return res.status(200).json({
      pix_code: data.pix_code,
      qr_code: data.qr_code
    });

  } catch (err) {
    return res.status(500).json({ error: "Erro ao gerar pagamento" });
  }
}
