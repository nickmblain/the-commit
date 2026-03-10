import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-11-vue-dotnet',
    title: 'Vue 3 with a .NET Backend: The Patterns That Actually Work',
    date: '2026-11-19',
    excerpt:
        'Running a Vue 3 SPA against a .NET Web API is a common stack and an underwritten topic. Here are the patterns for development setup, API integration, auth, and deployment that have held up in production.',
    tags: ['vue', 'dotnet', 'architecture', 'patterns'],
    readingTimeMinutes: 7,
    body: [
        {
            type: 'paragraph',
            content:
                "The Vue 3 plus .NET combination is more common than the documentation suggests. You have a Vue SPA that owns the UI and a .NET Web API that owns the data and business logic. The two are separate deployable units that communicate over HTTP. Getting the development experience right, the auth story correct, and the deployment model intentional are the three decisions that determine how pleasant this stack is to work in.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Development Setup: The Vite Proxy',
        },
        {
            type: 'paragraph',
            content:
                "During development, your Vue app runs on one port (typically 5173) and your .NET API on another (typically 5000 or 7000). Without configuration, every API call is a cross-origin request and CORS becomes a constant friction point. The right fix is a Vite dev proxy, not permissive CORS headers.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7000',
        changeOrigin: true,
        secure: false, // accept self-signed dev cert
      },
    },
  },
})`,
        },
        {
            type: 'paragraph',
            content:
                "Any request your Vue app makes to /api/* gets proxied to the .NET backend by Vite. From the browser's perspective, the request is same-origin. No CORS headers needed in development, and your fetch calls stay clean.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'A Typed API Layer',
        },
        {
            type: 'paragraph',
            content:
                "Raw fetch calls scattered across components do not scale. A thin composable that wraps fetch and types the responses gives you a single place to handle auth headers, error normalization, and base URL configuration.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `// composables/useApi.ts
const BASE = import.meta.env.VITE_API_BASE ?? '/api'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(\`\${BASE}\${path}\`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...init?.headers,
    },
  })

  if (!res.ok) throw new Error(\`API error: \${res.status}\`)
  return res.json() as Promise<T>
}

export function useApi() {
  const get = <T>(path: string) => request<T>(path)
  const post = <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) })

  return { get, post }
}`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Auth: JWT From .NET to Vue',
        },
        {
            type: 'paragraph',
            content:
                "The most common auth pattern with this stack is .NET issuing a JWT on login, the Vue app storing a reference to it, and attaching it as a Bearer token on subsequent API requests. Where you store the token matters for security.",
        },
        {
            type: 'paragraph',
            content:
                "For most applications, storing the JWT in memory (a reactive ref in a composable, not localStorage) and using an httpOnly refresh token cookie for session persistence is the right tradeoff. The access token never touches localStorage or the DOM, and the refresh flow happens transparently through a cookie the browser manages automatically.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `// composables/useAuth.ts
const accessToken = ref<string | null>(null)

export function useAuth() {
  const isAuthenticated = computed(() => accessToken.value !== null)

  const login = async (credentials: LoginPayload) => {
    const { token } = await useApi().post<{ token: string }>('/auth/login', credentials)
    accessToken.value = token
  }

  const logout = () => {
    accessToken.value = null
    // POST to /auth/logout to clear the httpOnly refresh cookie
  }

  // Exposed for the API layer to attach to requests
  const getToken = () => accessToken.value

  return { isAuthenticated, login, logout, getToken }
}`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'CORS in Production',
        },
        {
            type: 'paragraph',
            content:
                "If your Vue app and .NET API are on different origins in production, configure CORS explicitly in .NET with a strict allowlist. Never use AllowAnyOrigin in production.",
        },
        {
            type: 'code',
            language: 'csharp',
            content: `// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("VueApp", policy =>
    {
        policy.WithOrigins("https://yourapp.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // required for cookie-based auth
    });
});

app.UseCors("VueApp");`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Deployment Models',
        },
        {
            type: 'paragraph',
            content:
                "There are two clean options for production. Separate hosting means the Vue build goes to a CDN or static host and the API goes to its own server or container. This is the most flexible model and the one I prefer: the frontend and backend can deploy independently, scale independently, and be developed by separate teams without coordination overhead.",
        },
        {
            type: 'paragraph',
            content:
                "The alternative is serving the Vue static build from .NET itself, using the SPA static files middleware. This simplifies deployment to a single artifact but couples frontend and backend release cycles. It works well for smaller teams or projects where deployment simplicity matters more than independent scalability.",
        },
        {
            type: 'code',
            language: 'csharp',
            content: `// Program.cs — serving Vue from .NET
app.UseDefaultFiles();
app.UseStaticFiles();

// Fallback for SPA client-side routing
app.MapFallbackToFile("index.html");`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Mental Model',
        },
        {
            type: 'quote',
            content:
                "Treat .NET as a pure API layer. It owns data, validation, and business logic. Vue owns presentation and user interaction. The boundary between them is HTTP, and keeping it clean keeps both sides maintainable.",
        },
        {
            type: 'paragraph',
            content:
                "When the boundary leaks, the complexity follows. Business logic that lives in the Vue layer because it was faster to write there is logic you will have to move later, when you add a mobile client or a second frontend. The discipline of keeping .NET authoritative and Vue presentational pays off at scale.",
        },
    ],
}

export default article
