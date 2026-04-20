-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Henry_VIII
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Henry_VIII` ;

-- -----------------------------------------------------
-- Schema Henry_VIII
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Henry_VIII` DEFAULT CHARACTER SET utf8 ;
USE `Henry_VIII` ;

-- -----------------------------------------------------
-- Table `Henry_VIII`.`Quiz_Questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Henry_VIII`.`Quiz_Questions` (
  `question_id` INT NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(800) NOT NULL,
  `points` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`question_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Henry_VIII`.`Answer_Table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Henry_VIII`.`Answer_Table` (
  `answer_id` INT NOT NULL AUTO_INCREMENT,
  `question_id` INT NOT NULL,
  `answer` VARCHAR(450) NOT NULL,
  `correct_ans` TINYINT NOT NULL,
  INDEX `question_id_idx` (`question_id` ASC) VISIBLE,
  PRIMARY KEY (`answer_id`),
  CONSTRAINT `question_id`
    FOREIGN KEY (`question_id`)
    REFERENCES `Henry_VIII`.`Quiz_Questions` (`question_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
