import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ggkejiarqrzfaojhvlqo.supabase.co',  
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdna2VqaWFycXJ6ZmFvamh2bHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NjUyMzIsImV4cCI6MjA5MDU0MTIzMn0.aXzb7xMB3CN1lY73y2jafSfwDZxraL5g9dXt_iJMTP0' 
)

export async function sendMagicLink(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: 'http://localhost:5173',
    },
  })

  if (error) throw error
  return data
}
