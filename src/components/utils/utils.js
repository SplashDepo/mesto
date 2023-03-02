export function openPopup(popupType) {
  popupType.classList.add('popup_active')
  document.addEventListener('keydown', closePopupPressEsc)
}
export function closePopupPressEsc(e) {
  if (e.key === "Escape") {
    const openEl = document.querySelector('.popup_active')
    closePopup(openEl)
  }

}

export function closePopup(popupType) {
  popupType.classList.remove('popup_active')
  document.removeEventListener('keydown', closePopupPressEsc);
}