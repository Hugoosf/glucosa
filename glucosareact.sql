-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-03-2025 a las 20:09:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `glucosareact`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comidas`
--

CREATE TABLE `comidas` (
  `idusuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `idcomida` varchar(60) NOT NULL,
  `gl1h` int(11) NOT NULL,
  `rac` int(11) NOT NULL,
  `insu` int(11) NOT NULL,
  `glh2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `controlglu`
--

CREATE TABLE `controlglu` (
  `idusuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `lenta` int(11) NOT NULL,
  `deporte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `controlglu`
--

INSERT INTO `controlglu` (`idusuario`, `fecha`, `lenta`, `deporte`) VALUES
(12, '2025-03-02', 3, 1),
(12, '2025-03-20', 6, 3),
(12, '2025-03-21', 9, 2),
(13, '2025-02-11', 4, 2),
(13, '2025-03-11', 7, 2),
(13, '2025-03-19', 8, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hiper`
--

CREATE TABLE `hiper` (
  `idusuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `idcomida` varchar(60) NOT NULL,
  `glu` int(11) NOT NULL,
  `hora` time(6) NOT NULL,
  `corr` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hipo`
--

CREATE TABLE `hipo` (
  `idusuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `idcomida` varchar(60) NOT NULL,
  `glu` int(11) NOT NULL,
  `hora` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellidos` varchar(60) NOT NULL,
  `fechanac` date NOT NULL,
  `contrasena` varchar(200) NOT NULL,
  `usuario` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `nombre`, `apellidos`, `fechanac`, `contrasena`, `usuario`) VALUES
(12, 'Hugo', 'Suárez', '2005-10-10', 'Contrasena10', 'huguito'),
(13, 'Miguel', 'Castro', '2002-06-05', 'Aprobado11', 'maikyy');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comidas`
--
ALTER TABLE `comidas`
  ADD PRIMARY KEY (`idusuario`,`fecha`,`idcomida`),
  ADD KEY `fecha` (`fecha`),
  ADD KEY `idusuario` (`idusuario`),
  ADD KEY `idcomida` (`idcomida`);

--
-- Indices de la tabla `controlglu`
--
ALTER TABLE `controlglu`
  ADD PRIMARY KEY (`idusuario`,`fecha`),
  ADD KEY `fecha` (`fecha`),
  ADD KEY `idusuario` (`idusuario`);

--
-- Indices de la tabla `hiper`
--
ALTER TABLE `hiper`
  ADD PRIMARY KEY (`idusuario`,`fecha`,`idcomida`),
  ADD KEY `idusuario` (`idusuario`) USING BTREE,
  ADD KEY `hiper_ibfk_2` (`fecha`),
  ADD KEY `hiper_ibfk_3` (`idcomida`);

--
-- Indices de la tabla `hipo`
--
ALTER TABLE `hipo`
  ADD PRIMARY KEY (`idusuario`,`fecha`,`idcomida`),
  ADD KEY `idusuario` (`idusuario`) USING BTREE,
  ADD KEY `hipo_ibfk_2` (`fecha`),
  ADD KEY `hipo_ibfk_3` (`idcomida`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comidas`
--
ALTER TABLE `comidas`
  ADD CONSTRAINT `comidas_ibfk_2` FOREIGN KEY (`fecha`) REFERENCES `controlglu` (`fecha`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `controlglu`
--
ALTER TABLE `controlglu`
  ADD CONSTRAINT `controlglu_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `hiper`
--
ALTER TABLE `hiper`
  ADD CONSTRAINT `hiper_ibfk_2` FOREIGN KEY (`fecha`) REFERENCES `comidas` (`fecha`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `hipo`
--
ALTER TABLE `hipo`
  ADD CONSTRAINT `hipo_ibfk_2` FOREIGN KEY (`fecha`) REFERENCES `comidas` (`fecha`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
