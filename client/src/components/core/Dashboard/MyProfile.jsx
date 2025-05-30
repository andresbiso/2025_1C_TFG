import { useEffect } from 'react';
import { RiEditBoxLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { formattedDate } from '../../../utils/dateFormatter';
import IconBtn from '../../common/IconBtn';
import Img from './../../common/Img';

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h1 className="mb-14 text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
        {' '}
        Mi perfil
      </h1>

      <div className="flex items-center justify-between rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-3 sm:px-12">
        <div className="flex items-center gap-x-4">
          <Img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5 capitalize">
              {user?.firstName + ' ' + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>

        <IconBtn
          text="Editar"
          onclick={() => {
            navigate('/dashboard/settings');
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Sobre mi</p>
          <IconBtn
            text="Editar"
            onclick={() => {
              navigate('/dashboard/settings');
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <p
          className={`${
            user?.additionalDetails?.about
              ? 'text-richblack-5'
              : 'text-richblack-400'
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? 'Escribí algo sobre ti mismo'}
        </p>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Detalles personales
          </p>
          <IconBtn
            text="Editar"
            onclick={() => {
              navigate('/dashboard/settings');
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex max-w-[500px] justify-between ">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Nombre</p>
              <p className="text-sm font-semibold text-richblack-5 capitalize">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Tipo de cuenta</p>
              <p className="text-sm font-semibold text-richblack-5 capitalize">
                {user?.accountType}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">
                Correo Electrónico
              </p>
              <p className="text-sm font-semibold text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Género</p>
              <p className="text-sm font-semibold text-richblack-5">
                {user?.additionalDetails?.gender ?? 'Agregar género'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Apellido</p>
              <p className="text-sm font-semibold text-richblack-5 capitalize">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">
                Número de contacto
              </p>
              <p className="text-sm font-semibold text-richblack-5">
                {user?.additionalDetails?.contactNumber ??
                  'Agregar número de contacto'}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">
                Fecha de nacimiento
              </p>
              <p className="text-sm font-semibold text-richblack-5">
                {user?.additionalDetails?.dateOfBirth
                  ? formattedDate(user?.additionalDetails?.dateOfBirth)
                  : 'Agregar fecha de nacimiento'}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Display Integrations Details */}
      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Integraciones
          </p>
          <IconBtn
            text="Editar"
            onclick={() => {
              navigate('/dashboard/settings');
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        {user?.additionalDetails?.integrations ? (
          Object.entries(user.additionalDetails.integrations).map(
            ([name, data]) => (
              <div
                key={name}
                className="mt-4 p-4 border rounded-lg bg-richblack-700"
              >
                <p className="text-sm font-semibold text-richblack-5">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </p>
                <p className="text-sm font-medium text-richblack-400">
                  Estado: {data?.enabled ? 'Habilitado' : 'Deshabilitado'}
                </p>

                {data?.enabled && (
                  <>
                    {/* Telegram Integration */}
                    {name === 'telegram' && (
                      <>
                        <div className="mt-2">
                          <label className="text-sm text-richblack-5">
                            Chat ID:
                          </label>
                          <input
                            type="text"
                            value={data.chatId || ''}
                            disabled
                            className="w-full p-2 mt-1 bg-richblack-800 text-richblack-200 rounded-lg border border-richblack-600 cursor-not-allowed"
                          />
                        </div>
                        <div className="mt-2">
                          {data.notifications?.receiveAllNewCourses ? (
                            <div className="flex items-center gap-x-2">
                              <input
                                type="checkbox"
                                checked
                                disabled
                                className="cursor-not-allowed"
                              />
                              <label className="text-sm text-richblack-5">
                                Recibir todos los cursos nuevos
                              </label>
                            </div>
                          ) : (
                            <div>
                              <label className="text-sm text-richblack-5">
                                Límite de duración del curso:
                              </label>
                              <input
                                type="number"
                                value={
                                  data.notifications?.courseLengthThreshold ??
                                  ''
                                }
                                disabled
                                className="w-full p-2 mt-1 bg-richblack-800 text-richblack-200 rounded-lg border border-richblack-600 cursor-not-allowed"
                              />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )
          )
        ) : (
          <p className="text-richblack-400 text-sm font-medium">
            No hay integraciones configuradas aún.
          </p>
        )}
      </div>
    </>
  );
}
