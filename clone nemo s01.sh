#!/bin/bash
# Ce script doit être éxécutable par votre utilisateur
# Sinon chmod +x clone-ssh-with-prompt.sh
# Argument: -f => Permet de forcer la suppression du dossier si déjà existant avant cloning
# Exécution avec BASH !
# bash clone-ssh-with-prompt.sh

# read -p "Nom de la promo : " promo
# read -p "Prefixe du challenge : " challengeInput
echo

eval `ssh-agent -s`
ssh-add /c/Users/OMAO/.ssh/id_rsa-oclock

promo="nemo"
challengeInput="S01-parcours-html-css-"
challenge="$(echo -e "${challengeInput}" | tr -d '[:space:]')"

# Comptes github des étudiants
students=( $(cut -d ',' -f3 ./students_nemo.csv ) )

function gitClone()
{
  echo "******* CLONING *******"
  echo
  git clone "$1.git"
}

# URL du repo à cloner sans le .git final
url="git@github.com:O-clock-"$promo"/"$challenge

# Clone all
number=1
for userWithWhitespace in "${students[@]}"
do
  user="$(echo -e "${userWithWhitespace}" | tr -d '[:space:]')"

  echo ""
  echo "Student n°$number/${#students[@]} - $user"
  echo ""

  if [ -d $challenge$user ]
  then
	  echo "*******"
	  echo "FOLDER ALREADY EXIST"
	  echo "*******"

	  if [ -z "$1" ]
	  then
	  	echo ""
		  echo "Passage à l'étudiant suivant..."
		  echo ""
	  elif [ "$1" = "-f" ]
    then
      echo ""
      echo "Suppression du dossier..."
      echo ""
      rm -rf $challenge$user
      gitClone $url$user
    else
      echo ""
      echo "Argument inconnu"
      echo ""
    fi
  else
    gitClone $url$user
  fi

  echo "-------"
  number=$((number+1));
done
