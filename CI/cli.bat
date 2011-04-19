@echo off
title ChinaUMS
:list
cls
echo %cd%
echo 1.  Doctrine build-all
echo 2.  Doctrine build-all-load
echo 3.  Doctrine build-all-reload
echo 4.  Doctrine compile
echo 5.  Doctrine create-db
echo 6.  Doctrine create-tables
echo 7.  Doctrine dql
echo 8.  Doctrine drop-db
echo 9.  Doctrine dump-data
echo 10. Doctrine generate-migration
echo 11. Doctrine generate-migrations-db
echo 12. Doctrine generate-migrations-diff
echo 13. Doctrine generate-migrations-models
echo 14. Doctrine generate-models-db
echo 15. Doctrine generate-models-yaml
echo 16. Doctrine generate-sql
echo 17. Doctrine generate-yaml-db
echo 18. Doctrine generate-yaml-models
echo 19. Doctrine load-data
echo 20. Doctrine migrate
echo 21. Doctrine rebuild-db
echo ==================================
set choice=
set /p choice=Please Choose one:
IF NOT "%Choice%"=="" SET Choice=%Choice:~0,10%
if /i "%choice%"=="1"  goto build-all
if /i "%choice%"=="2"  goto build-all-load
if /i "%choice%"=="3"  goto build-all-reload
if /i "%choice%"=="4"  goto compile
if /i "%choice%"=="5"  goto create-db
if /i "%choice%"=="6"  goto create-tables
if /i "%choice%"=="7"  goto dql
if /i "%choice%"=="8"  goto drop-db
if /i "%choice%"=="9"  goto dump-data
if /i "%choice%"=="10" goto enerate-migration
if /i "%choice%"=="11" goto enerate-migrations-db
if /i "%choice%"=="12" goto generate-migrations-diff
if /i "%choice%"=="13" goto generate-migrations-models
if /i "%choice%"=="14" goto generate-models-db
if /i "%choice%"=="15" goto generate-models-yaml
if /i "%choice%"=="16" goto generate-sql
if /i "%choice%"=="17" goto generate-yaml-db
if /i "%choice%"=="18" goto generate-yaml-models
if /i "%choice%"=="19" goto load-data
if /i "%choice%"=="20" goto migrate
if /i "%choice%"=="21" goto rebuild-db

:build-all 
php application/doctrine.php build-all
pause
goto :list

:build-all-load
php application/doctrine.php build-all-load

:build-all-reload
php application/doctrine.php build-all-reload

:compile
php application/doctrine.php compile

:create-db
php application/doctrine.php create-db
:create-tables

php application/doctrine.php create-tables
:dql
php application/doctrine.php dql

:drop-db
php application/doctrine.php drop-db

:dump-data
php application/doctrine.php dump-data

:generate-migration
php application/doctrine.php generate-migration

:generate-migrations-db
php application/doctrine.php generate-migrations-db

:generate-migrations-diff
php application/doctrine.php generate-migrations-diff

:generate-migrations-models
php application/doctrine.php generate-migrations-models

:generate-models-db
php application/doctrine.php enerate-models-db

:generate-models-yaml
php application/doctrine.php generate-models-yaml

:generate-sql
php application/doctrine.php generate-sql

:generate-yaml-db
php application/doctrine.php generate-yaml-db

:generate-yaml-models
php application/doctrine.php generate-yaml-models

:load-data
php application/doctrine.php load-data
pause
goto :list

:migrate
php application/doctrine.php migrate

:rebuild-db
php application/doctrine.php migrate rebuild-db
