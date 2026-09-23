import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useEffect, useState, useRef } from 'react';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

interface IArticleParamsForm {
	startState: ArticleStateType;
	changeState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	startState,
	changeState,
}: IArticleParamsForm) => {
	const [open, setOpen] = useState<boolean>(false);
	const [form, setForm] = useState(startState);

	const asideRef = useRef<HTMLElement | null>(null);

	const arrowClick = () => {
		setOpen(!open);
	};

	useEffect(() => {
		if (open === false) {
			return;
		}

		const articleClick = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', articleClick);

		return () => {
			document.removeEventListener('mousedown', articleClick);
		};
	}, [open]);

	useEffect(() => {
		if (open) {
			setForm(startState);
		}
	}, [open, startState]);

	useEffect(() => {
		if (asideRef.current) {
			if (open) {
				asideRef.current.classList.add(styles.container_open);
			} else {
				asideRef.current.classList.remove(styles.container_open);
			}
		}
	}, [open]);

	const selectChange = <T extends keyof ArticleStateType>(
		key: T,
		value: ArticleStateType[T]
	) => {
		setForm((state) => ({ ...state, [key]: value }));
	};

	const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		changeState(form);
		setOpen(false);
	};

	const resetForm = () => {
		changeState(defaultArticleState);
		setForm(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={open} onClick={arrowClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}
				ref={asideRef}>
				<form className={styles.form} onSubmit={submitForm} onReset={resetForm}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={form.fontFamilyOption}
						onChange={(el) => {
							selectChange('fontFamilyOption', el);
						}}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={form.fontSizeOption}
						onChange={(el) => {
							selectChange('fontSizeOption', el);
						}}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={form.fontColor}
						onChange={(el) => {
							selectChange('fontColor', el);
						}}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={form.backgroundColor}
						onChange={(el) => {
							selectChange('backgroundColor', el);
						}}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={form.contentWidth}
						onChange={(el) => {
							selectChange('contentWidth', el);
						}}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
