const NavBar = () => {
    const { user, logout } = useAuth();
   
    return (
      <nav className="bg-green-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <NavBrand />
            <NavLinks user={user} onLogout={logout} />
          </div>
        </div>
      </nav>
    );
   };

export default NavBar;