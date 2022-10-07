import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PercentIcon from '@mui/icons-material/Percent';
import MoneyIcon from '@mui/icons-material/Money';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

import { red, green, blue, orange, } from '@mui/material/colors';

export function MediaControlCard({ title, subtitle, icon }) {
    const theme = useTheme();

    const style = {
        card:{
            display: 'flex',
            borderRadius: '0.75rem',
            transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            boxShadow: 'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem'
        },
        cardMedia:{
            width: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
                icon === 'venta' ? 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))'
                    : icon === 'costo' ? 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))'
                        : icon === 'utilidad' ? 'linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))'
                            : icon === 'porcentaje' ? 'linear-gradient(195deg, rgb(236, 64, 122), rgb(216, 27, 96))'
                                : '',
        },
        cardContent:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            width: '100%'
        }
    }



    return (
        <Card sx={style.card}>
            <CardMedia
                component="i"
                sx={style.cardMedia}

            >
                {
                    icon === 'venta' ? <AttachMoneyIcon fontSize='large' sx={{ color: 'white' }} />
                        : icon === 'costo' ? <MoneyOffIcon fontSize='large' sx={{ color: 'white' }} />
                            : icon === 'utilidad' ? <MoneyIcon fontSize='large' sx={{ color: 'white' }} />
                                : icon === 'porcentaje' ? <PercentIcon fontSize='large' sx={{ color: 'white' }} />
                                    : ''
                }


            </CardMedia>

            <CardContent sx={style.cardContent}>
                <Typography component="div" color="text.secondary" variant="h5">
                    {title}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {subtitle}
                </Typography>
            </CardContent>


        </Card>
    );

}


