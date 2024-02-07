import { type NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET (req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url)
  const userCode = url.searchParams.get('code')

  /** Manejar caso de error */
  if (userCode) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(userCode)
  }

  return NextResponse.redirect(url.origin)
}
