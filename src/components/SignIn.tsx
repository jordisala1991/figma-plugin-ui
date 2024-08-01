import { signIn } from 'next-auth/react'

export function SignIn() {
  return (
    <form
      onSubmit={async () => {
        await signIn("figma")
      }}
    >
      <button type="submit">Signin with Figma</button>
    </form>
  )
}
