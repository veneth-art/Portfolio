import styled from 'styled-components'

const ButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  font-family: inherit;
  border: none;
  background: none;
`

export const PrimaryButton = styled(ButtonBase)`
  background: #00ff88;
  color: #000;
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 255, 136, 0.4);
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: #00ff88;
    filter: blur(15px);
    opacity: 0;
    z-index: -1;
    transition: opacity 150ms ease;
  }

  &:hover::after {
    opacity: 0.5;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

export const SecondaryButton = styled(ButtonBase)`
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.08);

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    border-color: #00ff88;
  }
`

export const GlowButton = styled(PrimaryButton)`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: #00ff88;
    filter: blur(15px);
    opacity: 0;
    z-index: -1;
    transition: opacity 150ms ease;
  }

  &:hover::after {
    opacity: 0.5;
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: #a0a0a0;
  font-size: 20px;
  transition: all 150ms ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #ffffff;
    border-color: #00ff88;
  }
`

export const ScrollHintButton = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #606060;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 150ms ease;

  &:hover {
    color: #00ff88;
  }
`
