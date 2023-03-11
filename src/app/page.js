/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import { Oval } from "react-loader-spinner";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.scss";
import logo from "/public/logo.webp";

export default function Home() {
  const [characters, setCharacters] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const storageCharacters = localStorage.getItem("characters");
    const parsedCharacters = JSON.parse(storageCharacters);
    if (parsedCharacters) {
      setCharacters(parsedCharacters);
    }
    const storageName = localStorage.getItem("name");
    const parsedName = JSON.parse(storageName);
    if (parsedName) {
      setName(parsedName);
    }

    if (!parsedCharacters) {
      fetch("https://rickandmortyapi.com/api/character")
        .then((res) => res.json())
        .then((data) => {
          setCharacters(data.results);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (characters) {
      localStorage.setItem("characters", JSON.stringify(characters));
    }
  }, [characters]);

  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(name));

    fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          setCharacters(null);
          return;
        }
        const quantityMobile = data.results.slice(0, 2);
        const quantityTable = data.results.slice(0, 8);
        innerWidth > 768
          ? setCharacters(quantityTable)
          : setCharacters(quantityMobile);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [name]);

  function inputChange(evt) {
    const inputName = evt.target.name;
    if (inputName) {
      setName(evt.target.value);
    } else {
      return;
    }
  }
  function onFormSubmit(evt) {
    evt.preventDefault();
    setName(name);
  }

  return (
    <div className="container">
      <div className={styles.main}>
        <Image
          priority
          className={styles.main_logo}
          src={logo}
          alt="logo rick & morty"
        />

        <form onSubmit={onFormSubmit}>
          <label className={styles.main_label}>
            <input
              value={name}
              onChange={inputChange}
              className={styles.main_input}
              placeholder="Filter by name..."
              name="name"
              type="text"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            />
            <BiSearchAlt2 className={styles.main_icon} />
          </label>
        </form>

        <ul className={styles.main_list}>
          {!characters ? (
            <div className={styles.main_loader}>
              <h1>Please, clear input field and try again!</h1>
              <Oval
                height={80}
                width={80}
                color="#000"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#464646"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : (
            characters
              .sort((x, y) => {
                return x.name.localeCompare(y.name);
              })
              .map((hero) => {
                return (
                  <li className={styles.main_item} key={hero.id}>
                    <Link
                      href={`./characters/${hero.id}`}
                      className={styles.main_card}
                    >
                      <div className={styles.main_wrap}>
                        <Image
                          priority
                          fill
                          sizes="(max-width: 768px) 100vw,
              (max-width: 1000px) 50vw,
              33vw"
                          src={hero.image}
                          alt="Character Image"
                        />
                      </div>
                      <div className={styles.main_text}>
                        <p className={styles.main_name}>{hero.name}</p>
                        <p className={styles.main_species}>{hero.species}</p>
                      </div>
                    </Link>
                  </li>
                );
              })
          )}
        </ul>
      </div>
    </div>
  );
}
