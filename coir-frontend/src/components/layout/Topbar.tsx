import { FaUniversalAccess } from "react-icons/fa";

export function Topbar() {
  return (
    <div className="top-header">
      <div className="top-header__inner">
        <p>Bharat Sarkar | Government of India</p>
        <div className="top-header__links">
          <a href="#main-content">Skip to main content</a>
          <a href="#accessibility">
            <FaUniversalAccess aria-hidden />
            <span>Accessibility Option</span>
          </a>
        </div>
      </div>
    </div>
  );
}
