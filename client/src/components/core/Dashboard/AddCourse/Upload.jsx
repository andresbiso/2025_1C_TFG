import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ''
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { 'image/*': ['.jpeg', '.jpg', '.png'] }
      : { 'video/*': ['.mp4'] },
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [name, register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [name, selectedFile, setValue]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        className={`${isDragActive ? 'bg-richblack-600' : 'bg-richblack-700'}
         flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
        {...getRootProps()}
        onClick={() => inputRef.current.click()} // Enable click upload
      >
        <input {...getInputProps()} ref={inputRef} />

        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Vista Previa"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player
                aspectRatio="16:9"
                playsInline
                src={previewSource}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              />
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Arrastrar y soltar {!video ? 'la imagen' : 'el video'}, o hacer
              click para{' '}
              <span className="font-semibold text-yellow-50">navegar</span> al
              archivo
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Relación de aspecto 16:9</li>
              <li>Tamaño recomendado 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {!viewData && previewSource && (
        <div className="mt-3">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation(); // Prevent unintended file input trigger
              setPreviewSource('');
              setSelectedFile(null);
              setValue(name, null);

              // ✅ Reset file input field for future uploads
              if (inputRef.current) {
                inputRef.current.value = '';
              }
            }}
            className="text-richblack-400 underline"
          >
            Cancelar
          </button>
        </div>
      )}

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} es requerido/a
        </span>
      )}
    </div>
  );
}

Upload.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
  setValue: PropTypes.func,
  errors: PropTypes.any,
  video: PropTypes.bool,
  viewData: PropTypes.any,
  editData: PropTypes.any,
};
