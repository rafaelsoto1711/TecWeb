TecWeb
======

Proyecto de Tecnologías de la Web


Rutas a cambiar
===============


Proyecto[ CreadorIndice ]

Clase: IndexDir.java

	Metodo main: 		ruta carpeta IR ubicada en /TecWeb/IR
	Metodo stopwords: 	ruta de archivo stopwords.txt en carpeta /TecWeb/stopwords/stopwords.txt


Proyecto[ Buscador ]

Clase: BuscarArchivo.java

	M�todo main: 		ruta de carpeta del �ndice invertido ubicado en /TecWeb/IR
	Metodo stopwords: 	ruta de archivo stopwords.txt en carpeta /TecWeb/stopwords/stopwords.txt


Librerias de los proyectos
==========================

Las librerias de los proyectos se encuentran en la carpeta /TecWeb/Proyectos-Jars/librerias, y deben ser importadas para que los proyectos funcionen.


Ejecutar AppWeb
===============

Para ejecutar la appWeb solo deben ir por consola a la carpeta ubicada en /TecWeb/tecwebapp/, y ejecutar

	node app.js

y la aplicaci�n se encontrar� disponible en "localhost:3000"

Nota: se debe tener instalado "node.js" en el computador perrines. Recuerden que deben generar los .jar de creaci�n de indice y ejecutarlo, para despu�s crear el .jar del buscador que debe dejarse en la carpeta /TecWeb/tecwebapp/ con el nombre "Buscador.jar".