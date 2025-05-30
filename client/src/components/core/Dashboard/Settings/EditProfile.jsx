import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { updateProfile } from '../../../../services/operations/SettingsAPI';
import IconBtn from '../../../common/IconBtn';

const genders = ['Masculino', 'Femenino', 'Otro'];
const botUrl = import.meta.env.VITE_BOT_URL;

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Store editable integrations in state
  const [editableIntegrations, setEditableIntegrations] = useState(
    user?.additionalDetails?.integrations || {}
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleIntegrationChange = (integrationName, fieldPath, value) => {
    setEditableIntegrations((prev) => {
      const updatedIntegration = { ...prev[integrationName] };

      // If we're updating notifications, spread the notifications object too
      if (fieldPath.startsWith('notifications.')) {
        updatedIntegration.notifications = {
          ...updatedIntegration.notifications,
          [fieldPath.split('.')[1]]: value,
        };
      } else {
        updatedIntegration[fieldPath] = value;
      }

      return { ...prev, [integrationName]: updatedIntegration };
    });
  };

  const submitProfileForm = async (data) => {
    // Convert all empty strings to undefined
    Object.keys(data).forEach((key) => {
      if (data[key] === '') {
        data[key] = undefined;
      }
    });

    // Merge integrations data into request payload
    data.integrations = editableIntegrations;

    // Check for required Chat ID if Telegram is enabled
    if (
      data.integrations?.telegram?.enabled &&
      (!data.integrations?.telegram?.chatId ||
        data.integrations?.telegram?.chatId.length < 3 ||
        !/^\d+$/.test(data.integrations?.telegram?.chatId))
    ) {
      toast.error('Integración Telegram: El Chat ID es obligatorio.');
      return;
    }

    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log('ERROR MESSAGE - ', error.message);
    }

    navigate('/dashboard/my-profile');
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-6 sm:px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Sobre mi</h2>
          <div className="flex flex-col gap-2">
            <textarea
              name="about"
              id="about"
              placeholder="Ingresá tu biografía"
              className="form-style"
              {...register('about', { required: false })}
              defaultValue={user?.additionalDetails?.about}
            />
            {errors.about && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Por favor, ingresá tu biografía.
              </span>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-6 sm:px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Información de perfil
          </h2>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                Nombre
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Ingresar nombre"
                className="form-style"
                {...register('firstName', { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Por favor, ingresá tu nombre.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Apellido
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Ingresar apellido"
                className="form-style"
                {...register('lastName', { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Por favor, ingresá tu apellido.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style"
                {...register('dateOfBirth', {
                  required: {
                    value: false,
                    message: 'Por favor, ingresá tu fecha de nacimiento',
                  },
                  max: {
                    value: new Date().toISOString().split('T')[0],
                    message:
                      'La fecha de nacimiento no puede ser una fecha futura',
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth || undefined}
                onChange={(e) => {
                  if (!e.target.value) {
                    e.target.value = undefined;
                  }
                }}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Género
              </label>
              <select
                name="gender"
                id="gender"
                className="form-style"
                {...register('gender', {})}
                defaultValue={user?.additionalDetails?.gender || ''}
              >
                {/* Invalid default option */}
                <option value="" disabled>
                  Seleccionar género
                </option>

                {/* Render valid gender options */}
                {genders.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>

              {/* Show error message if user hasn't selected a valid option */}
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.gender.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Número de contacto
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Ingresá tu número de contacto"
                className="form-style"
                {...register('contactNumber', {
                  required: {
                    value: false,
                    message: 'Por favor, ingresá tu número de contacto',
                  },
                  maxLength: {
                    value: 12,
                    message: 'Número de contacto inválido',
                  },
                  minLength: {
                    value: 10,
                    message: 'Número de contacto inválido',
                  },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="email" className="lable-style">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Ingresá tu correo electrónico"
                className="form-style"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Por favor, ingresá tu correo electrónico',
                  },
                })}
                defaultValue={user?.email}
              />
              {errors.email && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Editable Integrations */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-6 sm:px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Integraciones
          </h2>

          {Object.entries(editableIntegrations).map(([name, data]) => (
            <div
              key={name}
              className="mt-4 p-4 border rounded-lg bg-richblack-700"
            >
              <p className="text-sm font-semibold text-richblack-5">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </p>

              {/* Checkbox to Enable Integration */}
              <div className="flex items-center gap-x-2 mt-2">
                <input
                  type="checkbox"
                  checked={data?.enabled || false}
                  onChange={(e) =>
                    handleIntegrationChange(name, 'enabled', e.target.checked)
                  }
                  className="cursor-pointer accent-richblack-600"
                />
                <label className="text-sm text-richblack-5">
                  Habilitar integración{' '}
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </label>
              </div>

              {data?.enabled && name === 'telegram' && (
                <>
                  {/* Chat ID Field with Instructions */}
                  <div className="mt-4 p-4 bg-richblack-800 rounded-md border border-richblack-700">
                    <label className="text-sm text-richblack-5">Chat ID:</label>
                    <input
                      type="text"
                      value={data.chatId || ''}
                      onChange={(e) =>
                        handleIntegrationChange(name, 'chatId', e.target.value)
                      }
                      className={`w-full p-2 mt-1 rounded-md border border-richblack-600 ${
                        errors.chatId
                          ? 'border-red-500'
                          : 'bg-richblack-700 text-richblack-200'
                      }`}
                    />
                    <p className="text-xs text-richblack-400 mt-2">
                      Necesitás una cuenta de Telegram. Para obtener tu Chat ID,
                      visita{' '}
                      <a
                        href={botUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        este bot
                      </a>
                      .
                    </p>

                    {/* Error Message for Chat ID Validation */}
                    {data.enabled &&
                      (!data.chatId ||
                        data.chatId.length < 3 ||
                        !/^\d+$/.test(data.chatId)) && (
                        <p className="text-sm text-yellow-500 mt-1">
                          *El Chat ID es obligatorio y debe contener solo
                          números con al menos 3 caracteres.
                        </p>
                      )}
                  </div>

                  {/* Checkbox to Enable Notification Settings */}
                  <div className="flex items-center gap-x-2 mt-4">
                    <input
                      type="checkbox"
                      checked={data.notifications?.enabled || false}
                      onChange={(e) =>
                        handleIntegrationChange(
                          name,
                          'notifications.enabled',
                          e.target.checked
                        )
                      }
                      className="cursor-pointer accent-richblack-600"
                    />
                    <label className="text-sm text-richblack-5">
                      Habilitar notificaciones
                    </label>
                  </div>

                  {/* Notification Settings Section (Styled) */}
                  {data.notifications?.enabled && (
                    <div className="mt-4 p-4 bg-richblack-800 rounded-md border border-richblack-700">
                      <div className="mt-2">
                        <label className="text-sm text-richblack-5">
                          Límite de duración del curso (en minutos):
                        </label>
                        <input
                          type="number"
                          value={
                            data.notifications?.courseLengthThreshold ?? 10
                          } // ✅ Default value set to 10
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value >= 10 && value <= 30) {
                              handleIntegrationChange(
                                name,
                                'notifications.courseLengthThreshold',
                                value
                              );
                            }
                          }}
                          min={10}
                          max={30}
                          readOnly={data.notifications?.receiveAllNewCourses}
                          className={`w-full p-2 mt-1 rounded-md border border-richblack-600 ${
                            data.notifications?.receiveAllNewCourses
                              ? 'bg-richblack-600 cursor-not-allowed text-richblack-400'
                              : 'bg-richblack-700 text-richblack-200'
                          }`}
                        />

                        {/* Error Message */}
                        {data.notifications?.courseLengthThreshold &&
                          (data.notifications?.courseLengthThreshold < 10 ||
                            data.notifications?.courseLengthThreshold > 30) && (
                            <p className="text-sm text-red-500 mt-1">
                              El límite debe estar entre 10 y 30.
                            </p>
                          )}
                      </div>

                      <div className="flex items-center gap-x-2">
                        <input
                          type="checkbox"
                          checked={
                            data.notifications?.receiveAllNewCourses || false
                          }
                          onChange={(e) => {
                            handleIntegrationChange(
                              name,
                              'notifications.receiveAllNewCourses',
                              e.target.checked
                            );
                            if (e.target.checked) {
                              handleIntegrationChange(
                                name,
                                'notifications.courseLengthThreshold',
                                ''
                              );
                            }
                          }}
                          className="cursor-pointer accent-richblack-600"
                        />
                        <label className="text-sm text-richblack-5">
                          Recibir todos los cursos nuevos
                        </label>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate('/dashboard/my-profile');
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancelar
          </button>
          <IconBtn type="submit" text="Guardar" />
        </div>
      </form>
    </>
  );
}
