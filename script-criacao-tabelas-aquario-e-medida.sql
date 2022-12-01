/* Comandos para SQL Workbench - Local - Desenvolvimento */

-- CREATE DATABASE alertcenter;

-- USE alertcenter;

-- Entidade Forte
CREATE TABLE Sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
numeroSerie VARCHAR(10),
descricao VARCHAR(45),
fkRack INT,
FOREIGN KEY (fkRack) REFERENCES Rack(idRack)
);

-- Entidade Fraca (depende do Sensor)
CREATE TABLE Metrica (
idMetrica INT,
fkSensor INT,
FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
PRIMARY KEY (idMetrica,fkSensor),
temperatura DECIMAL(10,2),
umidade DECIMAL(10,2),
dtMetrica DATETIME
);


/* Comandos para SQL Server - Remoto - Produção */

CREATE USER [usuarioParaAPIArduino_datawriter]
WITH PASSWORD = '#Gf_senhaParaAPI',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter', @membername = N'usuarioParaAPIArduino_datawriter';

CREATE TABLE sensor (
idSensor INT PRIMARY KEY IDENTITY(1,1),
numeroSerie VARCHAR(10),
descricao VARCHAR(45),
fkRack INT,
FOREIGN KEY (fkRack) REFERENCES rack(idRack)
);

CREATE TABLE metrica (
idMetrica INT IDENTITY(1,1),
fkSensor INT,
FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
PRIMARY KEY (idMetrica,fkSensor),
temperatura DECIMAL(10,2),
umidade DECIMAL(10,2),
dtMetrica DATETIME
);
