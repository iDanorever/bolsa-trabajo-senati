# 🎯 SENATI - Bolsa de Trabajo y Seguimiento PEA

Este proyecto es una aplicación web desarrollada para el curso de Desarrollo de Software en SENATI. Permite gestionar la bolsa de trabajo, registrar empresas, hacer seguimiento del Plan Específico de Aprendizaje (PEA) y administrar el perfil del aprendiz.

## 🚀 Tecnologías utilizadas

- **Frontend:** Next.js, shadcn/ui, Tailwind CSS
- **Backend:** Node.js, Express
- **Base de datos:** MySQL (XAMPP)

---

## ⚙️ Cómo ejecutar el proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/iDanorever/bolsa-trabajo-senati/tree/main
cd bolsa-trabajo-senati
```

#BACKEND

```
cd backend
npm install
npm run dev
```

El puerto de MySQL (XAMPP) es 3306, el servidor backend se ejecutará en: http://localhost:3000 asi que saldra:

```
Servidor en http://localhost:3000
Vacantes: http://localhost:3000/api/vacantes
Empresas: http://localhost:3000/api/empresas
KPIs: http://localhost:3000/api/kpis
Conectado a MySQL de XAMPP!
```

#FRONTEND

```
cd frontend
npm install
npm run dev
```

mientras el ```chadnc/ui```:
```
⚠ Port 3000 is in use by process 4540, using available port 3001 instead.
▲ Next.js 16.3.4 (Turbopack)
- Local:         http://localhost:3001
- Network:       http://192.168.1.46:3001
✓ Ready in 580ms
```
#INICIO DE PROYECTO
el proyecto se inicia por:
```
http://localhost:3001/login
```
#CREDENCIALES DE PRUEBA
- Email: ```daniel@senati.pe```
- Contraseña: ```123456```

---

# ⚙️ Principales Desafíos y Mejoras Implementadas

Durante el desarrollo de este proyecto, me enfrenté a varios desafíos técnicos que me permitieron aprender y mejorar la aplicación. Estos son los más significativos:


## 🧹 Configuración Inicial y Dependencias

**Desafío:**  
El proyecto empezó con una estructura algo desordenada, mezclando archivos de Vite y Node.js. Además, tuve problemas con la instalación de `shadcn/ui` porque la CLI había cambiado.

**Solución:**  
Limpié la estructura, separé claramente el backend (`/backend`) del frontend (`/frontend`) y actualicé el comando a:

```bash
npx shadcn@latest add

```


# 🗄️ Conexión con la Base de Datos MySQL
**Desafío:**
El mayor problema fue conectar el backend a MySQL. XAMPP usaba el puerto ```3307``` en lugar del estándar ```3306```, lo que impedía que el servidor se conectara correctamente. Además, la base de datos inicial ```softtech_db``` no existía y phpMyAdmin no respondía.

**Solución:**
Investigué la configuración de XAMPP, ajusté el puerto en el código de conexión y creé la base de datos ```softtech_db``` con sus tablas (```vacantes, empresas, usuarios```) directamente desde la terminal de MySQL, evitando así la dependencia de phpMyAdmin.


# 📦 Manejo de Módulos en Node.js
**Desafío:**
El servidor fallaba al iniciar con un error:

```
ReferenceError: require is not defined
```
Esto se debía a que el ```package.json``` tenía ```"type": "module"```, forzando el uso de ```import```, mientras que el código usaba ```require```.

**Solución:**
Eliminé la línea ```"type": "module"``` del ```package.json``` para que Node.js tratara el archivo como CommonJS, lo que permitió que el servidor arrancara sin problemas.




# 🧩 Errores de TypeScript en el Sidebar (shadcn/ui)
**Desafío:**
La implementación del Sidebar con ```shadcn/ui``` generaba múltiples errores de TypeScript, especialmente con las props ```asChild``` e ```isActive```, y con tipos de componentes como ```SidebarRail```.

**Solución:**
Tras varias iteraciones, simplifiqué el componente ```app-sidebar.tsx``` para no usar ```asChild``` y corregí los tipos en ```sidebar.tsx```, por ejemplo, cambiando:
```
React.ComponentProps<"button">
```
por:
```
React.ButtonHTMLAttributes<HTMLButtonElement>
```
y ajustando el tipado de ```setOpen```.



# 🎨 Mejora de la Experiencia de Usuario (UI/UX)
**Mejora 1:**
Para que la aplicación se viera más profesional, integré un ```Sidebar``` navegable en todas las páginas, permitiendo acceder fácilmente a las diferentes secciones como el Dashboard, la Bolsa de Trabajo o el Perfil.

**Mejora 2:**
Añadí funcionalidades clave como un sistema de login con redirección y un botón de **"Cerrar sesión"** en el Sidebar, mejorando el flujo de navegación y la experiencia general del usuario.

---

# 📕 DATOS Y MAS

**videos de apoyo**:
este trabajo e realizado con apoyo de algunos videos que lograron acabar hasta aqui que son:
- https://youtube.com/playlist?list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7&si=YMILrzJJphYhvyg8 - Curso de Node.JS Completo Desde Cero 
- https://youtu.be/3dSkc-DIM74?si=v13pic50cOAj21My - Node.js MySQL REST API
- https://youtu.be/cyxSPidS2so?si=40YlyIH5gQKOrK2Y - Servidor API REST con Node.js
- https://youtu.be/1hpc70_OoAg?si=HFoqYymi39F4LRoG - Aprende Node.js y Express
- https://youtu.be/JmJ1WUoUIK4?si=eNEQJuXgw7oWWWsi - Express Framework de Nodejs, Curso para principiantes
- https://www.youtube.com/live/2jxc8DMzt0I?si=mI_LJDlWMOsATWP3 - Curso de Next.js
- https://youtu.be/jMy4pVZMyLM?si=X_0QHXe3IHsrMUTC - aprendiendo next.js para principiante paso a paso
- https://youtu.be/JmJ1WUoUIK4?si=5Vcu68oQDAL6qqtB - Express Framework de Nodejs, Curso para principiantes
