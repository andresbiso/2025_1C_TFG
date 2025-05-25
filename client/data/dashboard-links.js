import { ACCOUNT_TYPE } from './../src/utils/constants';

export const sidebarLinks = [
  {
    id: 1,
    name: 'Mi Perfil',
    path: '/dashboard/my-profile',
    icon: 'VscAccount',
  },
  {
    id: 2,
    name: 'Panel de Control',
    path: '/dashboard/instructor',
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: 'VscDashboard',
  },
  {
    id: 3,
    name: 'Mis Cursos',
    path: '/dashboard/my-courses',
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: 'VscVm',
  },
  {
    id: 4,
    name: 'Agregar Curso',
    path: '/dashboard/add-course',
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: 'VscAdd',
  },
  {
    id: 5,
    name: 'Cursos Registrados',
    path: '/dashboard/enrolled-courses',
    type: ACCOUNT_TYPE.STUDENT,
    icon: 'VscMortarBoard',
  },
  // {
  //   id: 6,
  //   name: 'Historial de Registros',
  //   path: '/dashboard/purchase-history',
  //   type: ACCOUNT_TYPE.STUDENT,
  //   icon: 'VscHistory',
  // },
];
