import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './AuthModal.css'

export default function AuthModal() {
  const { authModal, authError, closeAuth, login, register, openLogin, openRegister } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isRegister = authModal === 'register'

  useEffect(() => {
    if (!authModal) {
      setName('')
      setEmail('')
      setPassword('')
    }
  }, [authModal])

  if (!authModal) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isRegister) {
      register(name, email, password)
    } else {
      login(email, password)
    }
  }

  return (
    <div className="modal-overlay" onClick={closeAuth} role="presentation">
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <button type="button" className="modal__close" onClick={closeAuth} aria-label="Fechar">
          ✕
        </button>

        <div className="modal__grid">
          <div className="modal__form-side">
            <h2 id="auth-title" className="modal__title">
              {isRegister ? 'Registro' : 'Log In'}
            </h2>

            {authError && <p className="modal__error">{authError}</p>}

            <form onSubmit={handleSubmit} className="modal__form">
              {isRegister && (
                <label className="field">
                  <span>Nome</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                  />
                </label>
              )}
              <label className="field">
                <span>E-mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </label>
              <label className="field">
                <span>Senha</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={1}
                />
              </label>
              <button type="submit" className="modal__submit">
                {isRegister ? 'CRIAR CONTA' : 'ENTRAR'}
              </button>
            </form>

            <p className="modal__switch">
              {isRegister ? (
                <>
                  Já é membro?{' '}
                  <button type="button" onClick={openLogin}>
                    Entrar
                  </button>
                </>
              ) : (
                <>
                  Novo por aqui?{' '}
                  <button type="button" onClick={openRegister}>
                    Criar conta
                  </button>
                </>
              )}
            </p>
          </div>

          <div className="modal__benefits">
            <h3>Por que ter uma conta?</h3>
            <ul>
              <li>Crie listas de Filmes e Séries</li>
              <li>Tenha acesso ao melhor Aplicativo</li>
              <li>Acesso a Brafilm Network™</li>
              <li>Notificações de lançamentos</li>
              <li>Compartilhe a sua opinião</li>
            </ul>
            {isRegister ? (
              <>
                <h3 className="modal__sub">Novo por aqui?</h3>
                <p>Crie sua conta em segundos para salvar seus favoritos.</p>
              </>
            ) : (
              <>
                <h3 className="modal__sub">Já é membro?</h3>
                <p>Entre com seus dados para acessar seu perfil.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
