import { Toast, ToastContainer as BSToastContainer } from "react-bootstrap"
import { useToast } from "../contexts/ToastContext"

const ToastContainer = () => {
  const { toasts, removeToast } = useToast()

  return (
    <BSToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          onClose={() => removeToast(toast.id)}
          show={true}
          delay={3000}
          autohide
          bg={toast.variant}
        >
          <Toast.Body className={toast.variant === "success" || toast.variant === "danger" ? "text-white" : ""}>
            {toast.message}
          </Toast.Body>
        </Toast>
      ))}
    </BSToastContainer>
  )
}

export default ToastContainer
