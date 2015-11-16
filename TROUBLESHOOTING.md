- Erro com `lwip` ou `make: g++: Command not found`
	- Solução:
	1. Instalar dependências do g++: `sudo apt-get install build-essential g++`
	2. Reinstalar o sprity:
	  1. desinstalar: ``npm uninstall sprity``
	  2. limpar cache: ``npm cache clear``
	  3. instalar: ``npm install sprity``

- Erro git://github.com/angular/bower-angular-animate.git", exit code of #128 fatal: unable to connect to github.com: github.com[0: 192.30.252.130]: errno=Tempo esgotado para conexão
	- Solução:
	Execute o comando:
	git config --global url."https://".insteadOf git://
