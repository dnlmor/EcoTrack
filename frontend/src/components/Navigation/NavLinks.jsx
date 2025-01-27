const NavLinks = ({ user, onLogout }) => {
    const links = [
      { to: '/tips', label: 'Tips' },
      { to: '/about', label: 'About' },
      { to: '/faq', label: 'FAQ' }
    ];
   
    return (
      <div className="flex items-center space-x-6">
        {links.map(link => (
          <NavLink key={link.to} to={link.to} label={link.label} />
        ))}
        {user ? (
          <NavDropdown user={user} onLogout={onLogout} />
        ) : (
          <AuthButtons />
        )}
      </div>
    );
   };

export default NavLinks;
   