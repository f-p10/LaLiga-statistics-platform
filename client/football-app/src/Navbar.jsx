function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        La Liga Player Search 2025/2026
      </a>
      <ul>
        <li>
          <a href="/stats">Stats</a>
        </li>
        <li>
          <a href="/clubs">Clubs</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
