import AuthenticationModal from '@/components/signin/authentication-modal'

export default function auth() {
  return (
    <div className="relative h-screen flex-col items-center justify-center">
      <AuthenticationModal />
    </div>
  )
}
