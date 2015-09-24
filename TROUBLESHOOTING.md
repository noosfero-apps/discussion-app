- Erro com `lwip` ou `make: g++: Command not found`
	- Solução:
	1. Instalar dependências do g++: `sudo apt-get install build-essential g++`
	2. Reinstalar o sprity:
	  1. desinstalar: ``npm uninstall sprity``
	  2. limpar cache: ``npm cache clear``
	  3. instalar: ``npm install sprity``