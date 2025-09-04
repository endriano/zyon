// src/lib/queryClient.ts
import { QueryClient, QueryFunction } from "@tanstack/react-query";

const API_BASE_URL_PHP = '/contact_form_handler.php';

export async function submitContactFormPhp(formData: any): Promise<{ success: boolean; message: string }> {
  const response = await fetch(API_BASE_URL_PHP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
      // Intenta obtener el mensaje de error del cuerpo de la respuesta
      let errorMessage = 'Error desconocido al enviar el formulario.';
      try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
      } catch (e) {
          // Si no se puede parsear el JSON, usa el texto de la respuesta
          try {
              errorMessage = await response.text() || errorMessage;
          } catch (e) {
              // Ignora errores al leer el texto
          }
      }
      throw new Error(errorMessage);
  }

  return response.json();
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // NO necesitas cambiar la apiUrl para /api/contact si está servido por el mismo servidor Express
  // La línea comentada de abajo es innecesaria en este caso.
  // const apiUrl = url === '/api/contact' ? '...' : url;

  // Simplemente usa la URL tal cual. El navegador la resolverá correctamente.
  const apiUrl = url;

  const res = await fetch(apiUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    // credentials: "include", // Solo si necesitas cookies/sesiones
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
