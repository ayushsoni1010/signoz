import { Row, Typography } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTypes } from 'types/api/alerts/alertTypes';

import { getOptionList } from './config';
import { AlertTypeCard, SelectTypeContainer } from './styles';
import { OptionType } from './types';

function SelectAlertType({ onSelect }: SelectAlertTypeProps): JSX.Element {
	const { t } = useTranslation(['alerts']);

	const optionList = getOptionList(t);

	function handleRedirection(option: AlertTypes): void {
		let url = '';
		switch (option) {
			case AlertTypes.METRICS_BASED_ALERT:
				url =
					'https://signoz.io/docs/alerts-management/metrics-based-alerts/?utm_source=product&utm_medium=alert-source-selection-page#examples';
				break;
			case AlertTypes.LOGS_BASED_ALERT:
				url =
					'https://signoz.io/docs/alerts-management/log-based-alerts/?utm_source=product&utm_medium=alert-source-selection-page#examples';
				break;
			case AlertTypes.TRACES_BASED_ALERT:
				url =
					'https://signoz.io/docs/alerts-management/trace-based-alerts/?utm_source=product&utm_medium=alert-source-selection-page#examples';
				break;
			case AlertTypes.EXCEPTIONS_BASED_ALERT:
				url =
					'https://signoz.io/docs/alerts-management/exceptions-based-alerts/?utm_source=product&utm_medium=alert-source-selection-page#example';
				break;
			default:
				break;
		}
		window.open(url, '_blank');
	}
	const renderOptions = useMemo(
		() => (
			<>
				{optionList.map((option: OptionType) => (
					<AlertTypeCard
						key={option.selection}
						title={option.title}
						onClick={(): void => {
							onSelect(option.selection);
						}}
					>
						{option.description}{' '}
						<Typography.Link
							onClick={(e): void => {
								e.preventDefault();
								e.stopPropagation();
								handleRedirection(option.selection);
							}}
						>
							Click here to see how to create a sample alert.
						</Typography.Link>{' '}
					</AlertTypeCard>
				))}
			</>
		),
		[onSelect, optionList],
	);

	return (
		<SelectTypeContainer>
			<Typography.Title
				level={4}
				style={{
					padding: '0 8px',
				}}
			>
				{t('choose_alert_type')}
			</Typography.Title>
			<Row>{renderOptions}</Row>
		</SelectTypeContainer>
	);
}

interface SelectAlertTypeProps {
	onSelect: (typ: AlertTypes) => void;
}

export default SelectAlertType;
