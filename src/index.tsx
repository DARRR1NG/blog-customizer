import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [stateStyles, setStateStyles] =
		useState<ArticleStateType>(defaultArticleState);
	const changeStateStyles = (state: ArticleStateType) => {
		setStateStyles(state);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': stateStyles.fontFamilyOption.value,
					'--font-size': stateStyles.fontSizeOption.value,
					'--font-color': stateStyles.fontColor.value,
					'--container-width': stateStyles.contentWidth.value,
					'--bg-color': stateStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				startState={stateStyles}
				changeState={changeStateStyles}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
