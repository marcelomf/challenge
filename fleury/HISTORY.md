- file system monitor, GIT ou RappitMQ+controle de estados, talvez algo pub/sub com REDIS tb...
  - Esolha: File System Monitor -> inotify
  - Motivo: Possivelmente a solução mais exotica, a qual talvez eu consiga mostrar para onde eu quero trilhar minha carreira.
    - No caso do windows:
      - Um código utilizando a Windows Filter API;
      - Hookar estilo ldpreload DLLs em userland chamadas como CreateFile();
      - Hookar kerneland dkom chamadas como HFIORead e HFIOWrite;
      - http://viralpatel.net/taj/tutorial/hello_world_bootloader.php
    - No caso do GNU/Linux:
      - Um código utilizando o inotify;
      - Hookar syscalls como open();
      - Hookar a libc;
    - No **** FWT TRUE HACKING!
      - Hookar a int 0x13(interrupção de hardware) em realmode(alterando o registrador cr0) http://viralpatel.net/taj/tutorial/hello_world_bootloader.php http://www.phrack.org/issues.html?id=4&issue=59&msgid=2
- transformar JSON em XML -> https://github.com/marcelomf/benchmark/blob/master/db/import_xml_json.js
- pessoas com caracteristicas e com autorelacionamento -> graojs


- Por questão de tempo:
  - Não implementei websockets adequadamente;
  - Não implementei links entre containers docker;

- ERRATA:
  - URL do video correta: https://goo.gl/HrLjS8
