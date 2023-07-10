import { Tooltip } from "./shared/components"

const App = () => {
  return (
    <main className="min-h-screen w-full overflow-auto flex justify-end p-10 pt-[100px] bg-neutral-200">
      <Tooltip
        content="tooltip  test primer tooltip que se vea bien asdnalsdkmaslk alskdmlaksmdlkasmd laskdmlaskdmlaksmdlkasmd alskdmlaskmdlkasmd lasdmlkasm dlkasmdlaksmd lasdkmlaksmdlaksdmalskdm alksdmlaksdmlaksdl alskdalskmd lmasl"
        anchor="top-left"
      >
        <span className="bg-blue-500 text-white px-3 py-1.5 rounded-full inline-block">
          HOVER ME
        </span>
      </Tooltip>
      <div className="h-[2000px]">asd</div>
    </main>
  )
}

export default App
