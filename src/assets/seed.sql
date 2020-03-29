drop table registro;

CREATE TABLE IF NOT EXISTS registro
(id INTEGER PRIMARY KEY AUTOINCREMENT, lote TEXT, tipo TEXT, camion INTEGER,patente TEXT, kilos TEXT DEFAULT '', total INTEGER DEFAULT 0 , ENVIADO TEXT DEFAULT 'false' ,fecha TEXT DEFAULT CURRENT_DATE);
 
INSERT or REPLACE INTO registro (id, lote ,tipo, camion ,patente, kilos) VALUES (1, '1', 'camion',  '1', 'AA666AA','');
INSERT or REPLACE INTO registro (id, lote ,tipo, camion ,patente, kilos) VALUES (2, '1', 'camion',  '2', 'BB666BB','');
INSERT or REPLACE INTO registro (id, lote ,tipo, camion ,patente, kilos) VALUES (3, '2', 'camion',  '1', 'CC666CC','');
INSERT or REPLACE INTO registro (id, lote ,tipo, camion ,patente, kilos) VALUES (4, '2', 'camion',  '2', 'CC666CC','');
INSERT or REPLACE INTO registro (id, lote ,tipo ,camion ,patente, kilos) VALUES (5, '3 Norte', 'bolson',  '', 'CC666CC','');
INSERT or REPLACE INTO registro (id, lote ,tipo, camion ,patente, kilos) VALUES (6, '3 Norte', 'bolson',  '', '123','');
  