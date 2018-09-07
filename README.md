# Gendiff
[![Maintainability](https://api.codeclimate.com/v1/badges/114b4d0025dfd9e4f7e3/maintainability)](https://codeclimate.com/github/caviarman/project-lvl2-s321/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/114b4d0025dfd9e4f7e3/test_coverage)](https://codeclimate.com/github/caviarman/project-lvl2-s321/test_coverage)
[![Build Status](https://travis-ci.org/caviarman/project-lvl2-s321.svg?branch=master)](https://travis-ci.org/caviarman/project-lvl2-s321)
## Описание
Утилита для сравнения файлов форматов *.json, *.yaml, *.ini

#### Пример 
Получение результата возможно в трех вариантах:

[в виде структуры](https://asciinema.org/a/H9VIhjoy73DciOdJVMT3lAmmR)

[в виде простого текста](https://asciinema.org/a/sTtq6alq95N7X3tiOQ34Oy99p)

[в формате JSON](https://asciinema.org/a/OXSrhMq5cSAADYDa90Z5TaVvF)


## Установка
```
npm install -g gendiff-vi
```
## Использование

  Usage: gendiff [options] <firstConfig> <secondConfig>

  Compares two configuration files and shows a difference.

  Options:

    -V, --version        output the version number
    -f, --format [type]  Output format
    -h, --help           output usage information