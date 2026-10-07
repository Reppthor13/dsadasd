-- Adatbázis létrehozása és kiválasztása
CREATE DATABASE IF NOT EXISTS koncert_db 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_hungarian_ci;

USE koncert_db;

-- Táblák eltávolítása (újraépítés esetére)
DROP TABLE IF EXISTS koncertek;
DROP TABLE IF EXISTS helyszinek;

-- Helyszínek tábla
CREATE TABLE helyszinek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    varos VARCHAR(50) NOT NULL,
    befogadokepesseg INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Koncertek tábla
CREATE TABLE koncertek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fellepo_nev VARCHAR(100) NOT NULL,
    datum DATE NOT NULL,
    jegy_ar INT NOT NULL,
    helyszin_id INT NOT NULL,
    FOREIGN KEY (helyszin_id) REFERENCES helyszinek(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Kezdőadatok feltöltése: Helyszínek
INSERT INTO helyszinek (nev, varos, befogadokepesseg) VALUES
('Papp László Budapest Sportaréna', 'Budapest', 12500),
('MVM Dome', 'Budapest', 20000),
('Debreceni Főnix Csarnok', 'Debrecen', 8500),
('Győri Audi Aréna', 'Győr', 5500);

-- Kezdőadatok feltöltése: Koncertek
INSERT INTO koncertek (fellepo_nev, datum, jegy_ar, helyszin_id) VALUES
('Hungária', '2025-06-01', 18500, 1),
('Azahriah', '2025-05-24', 16000, 2),
('Caramel', '2025-11-15', 12000, 3),
('Majka', '2025-09-20', 14500, 1),
('Halott Pénz', '2025-10-10', 13500, 2),
('Tankcsapda', '2025-12-28', 11000, 3),
('Bagossy Brothers Company', '2025-08-12', 9500, 4); 