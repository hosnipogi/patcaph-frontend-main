import React, {
  useReducer,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { FormContext } from "../../contexts/FormContext"
import { Button, Modal } from "@windmill/react-ui"
import { BsFillPersonFill } from "react-icons/bs"

// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = 1

const CROPMAXWIDTH = 600

const initialstate = {
  upimg: null,
  crop: {
    unit: "%",
    width: 30,
    aspect: 1 / 1,
  },
  completedCrop: null,
  modalIsOpen: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_UPIMG":
      return {
        ...state,
        upimg: action.payload,
      }
    case "SET_CROP":
      return {
        ...state,
        crop: action.payload,
      }
    case "SET_COMPLETED_CROP":
      return {
        ...state,
        completedCrop: action.payload,
      }
    case "SET_MODAL_IS_OPEN":
      return {
        ...state,
        modalIsOpen: action.payload,
      }
    default:
      return state
  }
}

/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {HTMLCanvasElement} element - canvas ref element
 */
const getCroppedImg = (image, crop, element) => {
  const canvas = element
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  // canvas.width = crop.width;
  // canvas.height = crop.height;
  canvas.width =
    crop.width * scaleX > CROPMAXWIDTH ? CROPMAXWIDTH : crop.width * scaleX
  canvas.height =
    crop.height * scaleY > CROPMAXWIDTH ? CROPMAXWIDTH : crop.width * scaleY
  const ctx = canvas.getContext("2d")
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  ctx.imageSmoothingQuality = "high"

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    // 0,
    // 0,
    crop.width * scaleX * pixelRatio,
    crop.height * scaleY * pixelRatio,
    0,
    0,
    canvas.width > CROPMAXWIDTH ? CROPMAXWIDTH : canvas.width,
    canvas.height > CROPMAXWIDTH ? CROPMAXWIDTH : canvas.height
    // crop.width,
    // crop.height
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        try {
          blob.name = "memberImage"
          const file = URL.createObjectURL(blob)
          resolve(file)
        } catch (e) {
          reject(e)
        }
      },
      "image/jpeg",
      1
    )
  })
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialstate)
  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)
  const { formik, stuffForChildren } = useContext(FormContext)

  const { setFieldValue, dirty } = formik
  const { photo, setPhoto } = stuffForChildren

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener("load", () =>
        dispatch({ type: "SET_UPIMG", payload: reader.result })
      )
      reader.readAsDataURL(e.target.files[0])
      dispatch({ type: "SET_MODAL_IS_OPEN", payload: true })
    }
  }
  const onLoad = useCallback(img => {
    imgRef.current = img
  }, [])

  useEffect(() => {
    if (!state.completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    getCroppedImg(imgRef.current, state.completedCrop, previewCanvasRef.current)
      .then(async image => {
        fetch(image).then(async r => {
          const blobImg = await r.blob()
          const reader = new FileReader()
          reader.readAsDataURL(blobImg)
          reader.onloadend = function () {
            const base64data = reader.result
            setFieldValue("photo", base64data)
            setPhoto(base64data)
          } // convert to base64 for sending to server
        }) // convert blob URL Object back to blob
      })
      .catch(error => {
        console.log({ error })
        setFieldValue("photo", undefined)
      })
  }, [state.completedCrop, setFieldValue, dirty])

  return (
    <div className="relative flex flex-col items-center justify-center my-20">
      {!state.completedCrop ? (
        <div className="w-1/2 mb-8 md:w-1/3 lg:w-1/5">
          {photo === null ? (
            <BsFillPersonFill
              fill="gray"
              style={{ width: "10em", height: "10em" }}
            />
          ) : (
            <span className="border-4 border-gray-300 rounded-full shadow-lg ">
              <img src={photo} className="rounded-full" alt="avatar" />
            </span>
          )}
        </div>
      ) : state.crop.width !== 0 ? (
        <div
          className="relative w-1/2 mb-10 overflow-hidden bg-white rounded-full cursor-pointer md:w-1/3 lg:w-1/5 hover:opacity-75 cropLabel"
          style={{ WebkitMaskImage: "radial-gradient(white, black)" }} // required, 'Crop' div label not showing overflow hidden on safari
          onClick={() => {
            dispatch({ type: "SET_MODAL_IS_OPEN", payload: true })
          }}
        >
          <canvas
            ref={previewCanvasRef}
            className="w-full bg-black border-4 border-gray-400 rounded-full shadow-lg"
          />
          <div
            className="absolute w-full pt-1 pb-4 text-sm text-center text-black bg-gray-400 opacity-50"
            style={{ marginTop: "-35px" }}
          >
            Crop
          </div>
        </div>
      ) : (
        <p className="mb-8 text-sm text-red-500">
          Please select and{" "}
          <strong>
            <u>crop</u>
          </strong>{" "}
          picture
        </p>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        onClick={() => formik.setFieldTouched("photo")}
        className={`w-full md:w-1/2 border p-4 rounded-lg mb-4 block hover:border-gray-400 ${
          (formik.values.photo === undefined && formik.touched.photo) ||
          state.crop.width === 0
            ? "bg-red-100 border-red-300"
            : "border-gray-300 bg-white"
        }`}
      />
      <Modal isOpen={state.modalIsOpen}>123
        {/* <ModalHeader> */}
          <ReactCrop
            src={state.upimg}
            onImageLoaded={onLoad}
            crop={state.crop}
            onChange={c => dispatch({ type: "SET_CROP", payload: c })}
            onComplete={c =>
              dispatch({ type: "SET_COMPLETED_CROP", payload: c })
            }
            minWidth="50"
          />
        {/* </ModalHeader>
        <ModalFooter> */}
          <Button
            className="w-4/12 p-4 mt-4 text-white bg-blue-500 rounded-lg shadow-sm md:w-2/12 hover:bg-blue-700"
            type="button"
            onClick={() =>
              dispatch({
                type: "SET_MODAL_IS_OPEN",
                payload: false,
              })
            }
          >
            Crop
          </Button>
        {/* </ModalFooter> */}
      </Modal>
    </div>
  )
}
