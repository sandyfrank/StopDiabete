import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              StopDiabete
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard">Tableau de bord</NavLink>
                <NavLink to="/glucose">Ma glycémie</NavLink>
                <NavLink to="/risk-assessment">Test de risque</NavLink>
                <NavLink to="/education">Éducation</NavLink>
                
                <div className="pl-4 ml-4 border-l border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-medium hover:scale-110 transition-transform duration-200 shadow-lg"
                    >
                      {user?.firstName.charAt(0)}{user?.lastName.charAt(0)}
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      }
                    >
                      Déconnexion
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/education">Éducation</NavLink>
                <NavLink to="/risk-assessment">Test de risque gratuit</NavLink>
                <Button variant="ghost" size="sm" href="/login">
                  Connexion
                </Button>
                <Button variant="primary" size="sm" href="/register">
                  Créer un compte
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <MobileNavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    Tableau de bord
                  </MobileNavLink>
                  <MobileNavLink to="/glucose" onClick={() => setIsMobileMenuOpen(false)}>
                    Ma glycémie
                  </MobileNavLink>
                  <MobileNavLink to="/risk-assessment" onClick={() => setIsMobileMenuOpen(false)}>
                    Test de risque
                  </MobileNavLink>
                  <MobileNavLink to="/education" onClick={() => setIsMobileMenuOpen(false)}>
                    Éducation
                  </MobileNavLink>
                  <MobileNavLink to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    Mon profil
                  </MobileNavLink>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-left px-4 py-3 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <MobileNavLink to="/education" onClick={() => setIsMobileMenuOpen(false)}>
                    Éducation
                  </MobileNavLink>
                  <MobileNavLink to="/risk-assessment" onClick={() => setIsMobileMenuOpen(false)}>
                    Test de risque gratuit
                  </MobileNavLink>
                  <MobileNavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Connexion
                  </MobileNavLink>
                  <MobileNavLink to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    Créer un compte
                  </MobileNavLink>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium"
  >
    {children}
  </Link>
)

const MobileNavLink = ({
  to,
  children,
  onClick,
}: {
  to: string
  children: React.ReactNode
  onClick: () => void
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
  >
    {children}
  </Link>
)

export default Header
