import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Translation } from 'react-i18next';
import { MdPlayArrow, MdPause, MdReplay, MdDelete, MdVolumeUp, MdAdd, MdVolumeOff, MdFullscreen } from 'react-icons/md';
import {
	Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, ButtonGroup,
} from 'reactstrap';
import Slider from '../Slider/Slider.jsx';
import FormattedTime from '../FormattedTime/FormattedTime.jsx';
import './control.scss';
import Tooltip from '@material-ui/core/Tooltip';

const Control = ({
	className,
	isPlaying,
	played,
	playbackRate,
	duration,
	onSliderMouseUp,
	onSliderMouseDown,
	onSliderChange,
	onRewind,
	onPlayPause,
	onSpeedChange,
	onAddClick,
	isAdding,
	onAnnotationDeleteClick,
	isMuted,
	onMuteUnMute,
	onFullScreen,
	focusing
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { t } = useTranslation('twoDimensionalVideo');
	return (
		<div className={`player-control${className ? ` ${className}` : ''}`}>
			<div className='d-flex mt-2'>
				<div className='d-flex align-items-center'>
					<ButtonGroup>
						<Button className='player-control__button d-flex align-items-center' color='link' onClick={onRewind}>
							<MdReplay className='player-control__icon' />
						</Button>
						<Button className='player-control__button d-flex align-items-center' color='link' onClick={onPlayPause}>
							{isPlaying ? <MdPause className='player-control__icon' /> : <MdPlayArrow className='player-control__icon' />}
						</Button>
						<Button className='player-control__button d-flex align-items-center' color='link' onClick={onMuteUnMute}>
							{isMuted ? <MdVolumeOff className='player-control__icon' /> : <MdVolumeUp className='player-control__icon' />}
						</Button>
						{
							isAdding ?
								<Button
									disabled
									color='link'
									onClick={onAddClick}
									className='d-flex align-items-center player-control__icon player-control__button float-left '
								>
									<MdAdd />
								</Button>
								:
								<Tooltip title="Add UDR">
									<Button
										disabled={isAdding}
										color='link'
										onClick={onAddClick}
										className='d-flex align-items-center player-control__icon player-control__button float-left '
									>
										<MdAdd />
									</Button>
								</Tooltip>
						}
						{
							(isAdding || !focusing) ?
								<Button
									disabled
									color='link'
									onClick={() => onAnnotationDeleteClick()}
									className='d-flex align-items-center player-control__icon player-control__button float-left '
								>
									<MdDelete />
								</Button>
								:
								<Tooltip title="Delete UDR">
									<Button
										disabled={isAdding || !focusing}
										color='link'
										onClick={() => onAnnotationDeleteClick()}
										className='d-flex align-items-center player-control__icon player-control__button float-left '
									>
										<MdDelete />
									</Button>
								</Tooltip>
						}

					</ButtonGroup>
				</div>
				<div className='d-flex align-items-center'>
					<div className='player-control__time'>
						<FormattedTime seconds={played * duration} />
						{' / '}
						<FormattedTime seconds={duration} />
					</div>
				</div>
				<Slider
					played={played}
					onMouseUp={onSliderMouseUp}
					onMouseDown={onSliderMouseDown}
					onChange={onSliderChange}
				/>
			</div>
		</div>
	);
};

Control.propTypes = {
	className: PropTypes.string,
	isPlaying: PropTypes.bool,
	played: PropTypes.number,
	playbackRate: PropTypes.number,
	duration: PropTypes.number,
	onSliderMouseUp: PropTypes.func,
	onSliderMouseDown: PropTypes.func,
	onSliderChange: PropTypes.func,
	onRewind: PropTypes.func,
	onPlayPause: PropTypes.func,
	onSpeedChange: PropTypes.func,
};
Control.defaultProps = {
	className: '',
	isPlaying: false,
	played: 0,
	playbackRate: 1,
	duration: 0,
	onSliderMouseUp: () => { },
	onSliderMouseDown: () => { },
	onSliderChange: () => { },
	onRewind: () => { },
	onPlayPause: () => { },
	onSpeedChange: () => { },
};

export default Control;
