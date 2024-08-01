import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("figma")
      }}
    >
      <button type="submit">Signin with Figma</button>
    </form>
  )
}
