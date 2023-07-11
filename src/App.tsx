import {
  Alert,
  Modal,
  ModalBody,
  ModalFooter,
  Tooltip
} from "./shared/components"
import { useDialog } from "./shared/hooks"

const App = () => {
  const [modalRef, openModal, closeModal] = useDialog()
  const [alertRef, openAlert, closeAlert] = useDialog()
  return (
    <main className="min-h-screen w-full overflow-auto flex justify-center gap-5 p-10 pt-[100px] bg-neutral-200">
      <Tooltip content="click para abrir modal" anchor="top-left">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-3 py-1.5 rounded-full inline-block"
        >
          Open modal
        </button>
      </Tooltip>
      <button
        onClick={openAlert}
        className="bg-red-500 text-white px-3 py-1.5 rounded-full inline-block h-max"
      >
        Open alert
      </button>
      <Modal
        ref={modalRef}
        title="MODAL"
        onClose={closeModal}
        className="w-[1000px]"
      >
        <ModalBody className="h-[1000px]">cuerpo del modal</ModalBody>
        <ModalFooter>Acciones del modal</ModalFooter>
      </Modal>
      <Alert ref={alertRef} onClose={closeAlert}>
        Esta seguro de realizar esta accion <br />{" "}
        <strong>borrar todos los usuarios</strong>
      </Alert>
    </main>
  )
}

export default App
