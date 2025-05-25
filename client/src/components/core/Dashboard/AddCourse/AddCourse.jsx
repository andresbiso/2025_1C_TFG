import { useEffect } from 'react';
import RenderSteps from './RenderSteps';

export default function AgregarCurso() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex w-full items-start gap-x-6">
      <div className="flex flex-1 flex-col">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5 font-boogaloo text-center lg:text-left">
          Agregar Curso
        </h1>

        <div className="flex-1">
          <RenderSteps />
        </div>
      </div>

      {/* Consejos para subir cursos */}
      <div className="sticky top-10 hidden lg:block max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
        <p className="mb-8 text-lg text-richblack-5">
          Consejos para subir cursos
        </p>

        <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
          {/* <li>Define el precio del curso o configúralo como gratuito.</li> */}
          <li>El tamaño estándar de la miniatura del curso es 1024x576.</li>
          <li>
            La sección de video controla el video de presentación del curso.
          </li>
          <li>El Constructor de Curso es donde creas y organizas un curso.</li>
          <li>
            Agrega temas en la sección del Constructor de Curso para crear
            lecciones, cuestionarios y tareas.
          </li>
          <li>
            La información de la sección de Datos Adicionales aparecerá en la
            página del curso.
          </li>
          <li>Haz anuncios para notificar información importante.</li>
          <li>Envía notas a todos los estudiantes inscritos a la vez.</li>
        </ul>
      </div>
    </div>
  );
}
