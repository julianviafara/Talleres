interface HeaderProps {
  active: "ch04" | "ch05";
  onChange: (tab: "ch04" | "ch05") => void;
}

export default function Header({ active, onChange }: HeaderProps) {
  return (
    <header className="header">
      <span className="header__logo">
        Challenges by Julian Viafara - 2236004
      </span>
      <nav className="header__nav">
        <button
          className={`header__btn${active === "ch04" ? " active" : ""}`}
          onClick={() => onChange("ch04")}
        >
          Challenge 04
        </button>
        <button
          className={`header__btn${active === "ch05" ? " active" : ""}`}
          onClick={() => onChange("ch05")}
        >
          Challenge 05
        </button>
      </nav>
    </header>
  );
}
