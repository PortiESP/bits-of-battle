import scss from "../styles/PlayerSideMenu.module.scss"
import PlayerSideMenuButton from "./PlayerSideMenuButton.jsx"

export default function PlayerSideMenu(props) {
    return (
        <div className={scss.wrapper}>
            <aside>
                <PlayerSideMenuButton value="✨" teamId={props.teamId} powerUp="spark" />
                <PlayerSideMenuButton value="➕" teamId={props.teamId} powerUp="add" />
                <PlayerSideMenuButton value="🎁" teamId={props.teamId} powerUp="present" />
                <PlayerSideMenuButton value="🧱" teamId={props.teamId} powerUp="wall" />
            </aside>
        </div>
    )
}
