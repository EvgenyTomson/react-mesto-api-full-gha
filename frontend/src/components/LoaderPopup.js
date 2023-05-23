function LoaderPopup ({isOpen}) {
  return (
    <div
      className={isOpen ? "popup popup_type_loader popup_opened" : "popup popup_type_loader"}
    >
        <div className="popup__loader"><div></div><div></div><div></div><div></div>
        </div>
    </div>
  )
}

export default LoaderPopup;
