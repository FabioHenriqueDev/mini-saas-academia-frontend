type RegisterPayload = {
    name: string;
    email: string;
    password: string;
    cpf: string;
}

interface RegisterSucessResponse {
  success: true;
  user: {
    name: string;
    email: string;
    cpf: string;
    personal: boolean;
  };
}

interface RegisterErrorResponse {
  success: false;
  error: string;
}


export async function requestRegister(payload: RegisterPayload): Promise<RegisterSucessResponse | RegisterErrorResponse> {
  
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  console.log("Resposta recebida:", response.status);

  if (!response.ok) {
    return await response.json()
  }

  const data: RegisterSucessResponse = await response.json();
  
  console.log("Dados da API:", data);
  
  return data;
}