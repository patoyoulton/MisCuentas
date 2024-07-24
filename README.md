# MoonFlow

<img width="865" alt="MoonFlow" src="https://github.com/user-attachments/assets/28b865e1-cb2f-4711-b205-71bf5482d327">

## Bienvenido a MoonFlow

MoonFlow es una herramienta web de monitoreo y seguimiento de gastos e ingresos diseñada para ayudar a las personas y familias a mantener sus finanzas en orden. Nuestro objetivo es proporcionar una visualización clara y detallada del comportamiento financiero para cumplir con los objetivos económicos de cada usuario de manera tranquila y efectiva.

## Historia del Proyecto

La idea de MoonFlow nació de la necesidad personal de gestionar y centralizar los datos financieros de manera efectiva. Inicialmente concebido como una solución personal, este proyecto ha crecido con el tiempo y ahora se abre a la comunidad como un proyecto open-source. Creemos que, con el apoyo y las contribuciones de otros, MoonFlow puede evolucionar y ofrecer aún más funcionalidades.

## Características

- **Centralización de Datos Bancarios**: Mantén todos tus datos financieros en un sistema privado y seguro sin que nadie más tenga acceso a ellos.
- **Múltiples Usuarios**: Ideal para uso individual o familiar, permitiendo que cada miembro de la familia gestione sus finanzas de manera independiente.
- **Visualización de Datos**: Proporciona gráficos y análisis detallados de tus ingresos y gastos.
- **Automatización**: Nuestra visión incluye la automatización completa del proceso de registro de transacciones, ofreciendo consejos y avisos en tiempo real sobre la situación financiera.
- **Integración con Siri**: Automatiza los registros por voz, facilitando el proceso de registro en el momento real de pago.

## Contribuciones

MoonFlow es un proyecto open-source y agradecemos cualquier tipo de contribución. Ya sea reportando errores, sugiriendo mejoras, o contribuyendo con código, tu participación es bienvenida.

## Estructura del Proyecto
├── README.md
├── backend
│   ├── app.log
│   ├── certs
│   ├── config
│   │   └── config.js
│   ├── controllers
│   │   ├── accountController.js
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── transactionController.js
│   │   └── userController.js
│   ├── middlewares
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── accountModel.js
│   │   ├── categoryModel.js
│   │   ├── transactionModel.js
│   │   └── userModel.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   │   ├── accountRoutes.js
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── transactionRoutes.js
│   │   └── userRoutes.js
│   ├── server.js
│   ├── services
│   │   ├── accountService.js
│   │   ├── authService.js
│   │   ├── categoryService.js
│   │   ├── transactionService.js
│   │   └── userService.js
│   ├── uploads
│   │   └── profileImages
│   └── utils
│       ├── emailNotifier.js
│       ├── errorHandler.js
│       └── logger.js
├── database.sqlite
└── frontend
    ├── certs
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── assets
    │   │   ├── favico
    │   │   │   ├── android-chrome-192x192.png
    │   │   │   ├── android-chrome-512x512.png
    │   │   │   ├── apple-touch-icon.png
    │   │   │   ├── favicon-16x16.png
    │   │   │   ├── favicon-32x32.png
    │   │   │   └── favicon.ico
    │   │   ├── moonFlow-iso-v1.png
    │   │   └── moonFlow-iso-v2.png
    │   ├── index.html
    │   ├── manifest.json
    │   └── service-worker.js
    └── src
        ├── App.js
        ├── components
        │   ├── AccountCard.js
        │   ├── AccountForm.js
        │   ├── AccountList.js
        │   ├── BalanceCard.js
        │   ├── CategoryForm.js
        │   ├── CategoryList.js
        │   ├── Dashboard.js
        │   ├── FilterComponent.js
        │   ├── ImportExportComponent.js
        │   ├── Login.js
        │   ├── Navbar.js
        │   ├── PrivateRoute.js
        │   ├── ProfileForm.js
        │   ├── Register.js
        │   ├── TransactionChart.js
        │   ├── TransactionForm.js
        │   └── TransactionTable.js
        ├── context
        │   ├── AuthContext.js
        │   └── TransactionContext.js
        ├── index.css
        ├── index.js
        ├── pages
        │   ├── Accounts.js
        │   ├── Home.js
        │   ├── Reports.js
        │   ├── Settings.js
        │   └── Transactions.js
        ├── serviceWorkerRegistration.js
        ├── services
        │   ├── accountService.js
        │   ├── authService.js
        │   ├── categoryService.js
        │   ├── transactionService.js
        │   └── userService.js
        └── utils
            ├── formatAmount.js
            └── iconList.js

## Cómo Contribuir

1. **Forkea el Repositorio**: Haz un fork de este repositorio a tu cuenta de GitHub.
2. **Clona el Repositorio**: Clona el repositorio forkeado a tu máquina local.
3. **Crea una Rama**: Crea una nueva rama para tu característica o corrección.

git checkout -b feature/nueva-caracteristica

4. **Haz Commit de tus Cambios**: Realiza tus cambios y haz commit de ellos.

git commit -m 'Añadir nueva característica'

5. **Push a la Rama**: Sube tus cambios a la rama.

git push origin feature/nueva-caracteristica

6. **Abre un Pull Request**: Abre un pull request en GitHub describiendo tus cambios.

## Licencia

MoonFlow está licenciado bajo la [MIT License](LICENSE).
