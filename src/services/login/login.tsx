type LoginPayload = {
  email: string;
  password: string;
}
interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    personal: boolean;
  };
}

export async function requestLogin(payload: LoginPayload): Promise<LoginResponse> {
  
  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  console.log("Resposta recebida:", response.status);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Erro HTTP: ${response.status}`);
  } else if (response.status !== 200){
      throw new Error(`Erro HTTP: ${response.status}`);
  }

  const data: LoginResponse = await response.json();
  
  console.log("Dados da API:", data);
  
  
  return data;
}