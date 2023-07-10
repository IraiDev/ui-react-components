import { Modal, Tooltip } from "./shared/components"
import { useModal } from "./shared/hooks"

const App = () => {
  const { ref, handleOpen, handleClose } = useModal()
  return (
    <main className="min-h-screen w-full overflow-auto flex justify-center p-10 pt-[100px] bg-neutral-200">
      <Tooltip content="click para abrir modal" anchor="top-left">
        <button
          onClick={handleOpen}
          className="bg-blue-500 text-white px-3 py-1.5 rounded-full inline-block"
        >
          Open modal
        </button>
      </Tooltip>
      <Modal ref={ref} title="MODAL" onClose={handleClose}>
        cositas
      </Modal>
    </main>
  )
}

export default App
