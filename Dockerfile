FROM mcr.microsoft.com/windows/servercore:ltsc2022

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

RUN Set-ExecutionPolicy Bypass -Scope Process -Force;     [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;     iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

RUN choco install git -y;     choco install nodejs -y;     choco install vscode -y

RUN npm install --legacy-peer-deps

CMD ["powershell"]